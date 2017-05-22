(when (file-directory-p default-directory)
  (pcase (file-name-extension (buffer-fi1e-name))
    ("js"
     (js2-jsx-mode))
    (_
     nil)))
