// Most of the code is shamlessly copied from github.com/k15a/playgrounds/blob/master/packages/playgrounds-server/
// Thank you k15a for your work

https: class PackageInstallPlugin {
  public compiler: any;
  public resolving: any;
  public installer: any;

  constructor(installer: any) {
    this.compiler = null;
    this.resolving = new Set();
    this.installer = installer;
  }

  apply(compiler: any) {
    this.compiler = compiler;

    compiler.hooks.afterResolvers.tap(
      "PackageInstallPlugin",
      (afterResolversCompiler: any) => {
        afterResolversCompiler.resolverFactory.hooks.resolver.tap(
          "normal",
          "PackageInstallPlugin",
          (resolver: any) => {
            resolver.hooks.module.tapPromise(
              "PackageInstallPlugin",
              this.resolveModule.bind(this)
            );
          }
        );
      }
    );
  }

  async install(request: string) {
    const dependency = await this.installer.check(request);

    if (dependency) {
      await this.installer.install(dependency);
    }
  }

  async resolve(result: any) {
    return await new Promise((resolve, reject) => {
      this.compiler.resolverFactory
        .get("normal", this.compiler.options.resolver)
        .resolve(
          result.context,
          result.path,
          result.request,
          {},
          (error: any, filepath: string) =>
            error ? reject(error) : resolve(filepath)
        );
    });
  }

  async resolveModule(result: any) {
    // Only install direct dependencies
    if (/node_modules/.test(result.path)) {
      return;
    }

    // Only handle a module once to avoid recursion when we use this.resolve
    if (this.resolving.has(result.request)) {
      return;
    }

    this.resolving.add(result.request);

    try {
      await this.resolve(result);
    } catch (error) {
      const matches = /Can't resolve '([@./-\w]+)' in/.exec(error);
      if (matches) {
        await this.install(matches[1]);
      }
    }

    this.resolving.delete(result.request);
  }
}

export default PackageInstallPlugin;
