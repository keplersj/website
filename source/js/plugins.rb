require 'opal'

# Avoid `console` errors in browsers that lack a console.
unless (window.console && console.log)
  methods = [:assert, :clear, :count, :debug, :dir, :dirxml, :error, :exception, :group, :groupCollapsed, :groupEnd, :info, :log, :markTimeline, :profile, :profileEnd, :markTimeline, :table, :time, :timeEnd, :timeStamp, :trace, :warn]
  
  methods.each do |method|
    remove_method method
  end
end

# Place any jQuery/helper plugins in here.
