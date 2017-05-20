(pcase (file-name-extension (buffer-file-name))
  ("js"
   (js2-jsx-mode))
  (_
   nil))
