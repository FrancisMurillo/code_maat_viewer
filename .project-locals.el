(when (file-regular-p (or (buffer-file-name) ""))
  (let ((file-extension (file-name-extension (buffer-file-name))))
    (pcase file-extension
      ("js"
       (js2-jsx-mode))
      (_
       nil))))
