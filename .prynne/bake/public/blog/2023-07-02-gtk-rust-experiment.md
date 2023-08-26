---
title: Using React Native Syntax in Rust with GTK
date: 2023-07-02T06:00:00Z
featured_image: /assets/images/reactive-gtk-image.jpg
---

This weekend I wanted to try implementing an idea I've had for a while; using a [React Native](https://reactnative.dev/)-inspired syntax to create [GTK](https://www.gtk.org/) UIs with [Rust](https://www.rust-lang.org/).

This weekend experiment has resulted in my [`reactive-gtk` experiment](https://github.com/keplersj/reactive-gtk).

## Prior Art

I knew this sort of Rust-based syntactic sugar was very possible given the existence of libraries like [yew.rs](https://yew.rs/), but was less than impressed with the existing macro UIs for GTK (e.g., [relm](https://relm4.org/) with its [`view` macro](https://docs.rs/relm4-macros/0.6.0/relm4_macros/macro.view.html)) having used React Native previously.

## Implementation

To implement a React Native-style syntax in Rust, we needed a way to parse an XML-esque syntax with a Rust procedural macro and produce valid code for [gtk-rs](http://gtk-rs.org/). Thankfully, the [`rstml`](https://github.com/rs-tml/rstml) crate provides just the foundation we need here on top of the [`quote`](https://github.com/dtolnay/quote) and [`syn`](https://github.com/dtolnay/syn) crates.

After writing a simple proc-macro that takes nodes parsed by `rstml` and rewrites them to use `gtk-rs`'s Builder patterns, we're able to take [libadwaita](https://world.pages.gitlab.gnome.org/Rust/libadwaita-rs/stable/latest/docs/libadwaita/#)'s [example application](https://world.pages.gitlab.gnome.org/Rust/libadwaita-rs/stable/latest/docs/libadwaita/#example) from:

```rs
use adw::prelude::*;

use adw::{ActionRow, Application, ApplicationWindow, HeaderBar};
use gtk::{Box, ListBox, Orientation, SelectionMode};

fn main() {
    let application = Application::builder()
        .application_id("com.example.FirstAdwaitaApp")
        .build();

    application.connect_activate(|app| {
        // ActionRows are only available in Adwaita
        let row = ActionRow::builder()
            .activatable(true)
            .title("Click me")
            .build();
        row.connect_activated(|_| {
            eprintln!("Clicked!");
        });

        let list = ListBox::builder()
            .margin_top(32)
            .margin_end(32)
            .margin_bottom(32)
            .margin_start(32)
            .selection_mode(SelectionMode::None)
            // makes the list look nicer
            .css_classes(vec![String::from("boxed-list")])
            .build();
        list.append(&row);

        // Combine the content in a box
        let content = Box::new(Orientation::Vertical, 0);
        // Adwaitas' ApplicationWindow does not include a HeaderBar
        content.append(&HeaderBar::new());
        content.append(&list);

        let window = ApplicationWindow::builder()
            .application(app)
            .title("First App")
            .default_width(350)
            // add content to window
            .content(&content)
            .build();
        window.show();
    });

    application.run();
}
```

And rewrite it to the following:

```rs
use adw::prelude::*;
use adw::{ActionRow, Application, ApplicationWindow, HeaderBar};
use gtk::{glib::ExitCode, Box, ListBox, Orientation, SelectionMode};
use reactive_gtk::{build, widget};

fn main() -> ExitCode {
    build! {
        <Application
            application_id="com.example.FirstAdwaitaApp"
            self::connect_activate=|app| {
                build! {
                    <ApplicationWindow
                        application=app
                        title="First App"
                        default_width=350
                        // add content to window
                        content=&widget! {
                            // Combine the content in a box
                            <Box orientation=Orientation::Vertical>
                                // Adwaitas' ApplicationWindow does not include a HeaderBar
                                <HeaderBar />
                                <ListBox
                                    margin_top=32
                                    margin_end=32
                                    margin_bottom=32
                                    margin_start=32
                                    selection_mode=SelectionMode::None
                                    // makes the list look nicer
                                    css_classes=vec![String::from("boxed-list")]
                                >
                                    // ActionRows are only available in Adwaita
                                    <ActionRow
                                        activatable=true
                                        title="Click me"
                                        self::connect_activated=|_| {
                                            eprintln!("Clicked!");
                                        }
                                    />
                                </ListBox>
                            </Box>
                        }
                    />
                }.show();
            }
        />
    }
    .run()
}
```

## Future

In the future, I believe this approach of creating the view of an application using lightweight macros could be combined with a reactive state management and signal library like [leptos](https://github.com/leptos-rs/leptos) to bring many of the architecture patterns popularized by React to native programming.

As well, one could build on this work to create a sort of "primitives" UI library based directly on native code along the lines of the [react-primitives](https://github.com/lelandrichardson/react-primitives) library.
