diff --git a//dev/null b/eslint.config.mjs
index 0000000000000000000000000000000000000000..c85fb67c463f20d1ee449b0ffee725a61dfb9259 100644
--- a//dev/null
+++ b/eslint.config.mjs
@@ -0,0 +1,16 @@
+import { dirname } from "path";
+import { fileURLToPath } from "url";
+import { FlatCompat } from "@eslint/eslintrc";
+
+const __filename = fileURLToPath(import.meta.url);
+const __dirname = dirname(__filename);
+
+const compat = new FlatCompat({
+  baseDirectory: __dirname,
+});
+
+const eslintConfig = [
+  ...compat.extends("next/core-web-vitals", "next/typescript"),
+];
+
+export default eslintConfig;
