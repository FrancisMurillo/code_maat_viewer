(when (file-regular-p (buffer-file-name))
  (let ((file-extension (file-name-extension (buffer-file-name))))
    (pcase file-extension
      ("js"
       (js2-jsx-mode))
      (_
       nil))))
