import pkg from './package.json'
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: "named",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            exports: "named",
            sourcemap: true
        },
    ],
    plugins: [
        external(),
        postcss({
            modules: true,
        }),
        url(),
        svgr(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        commonjs(),
    ]
}
