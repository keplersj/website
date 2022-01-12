export default function vitePluginVirtualFile(virtualModuleId, data) {
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: `virtual-file (${virtualModuleId})`, // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${data}`;
      }
    },
  };
}
