(require 'prodigy)

(with-eval-after-load 'prodigy
  (defconst fbn/code-maat-viewer-service-name "code-maat-viewer-npm-runner"
    "The dev blog service name.")

  ;; Tags
  (prodigy-define-tag
    :name 'npm-runner
    :command "npm")

  (prodigy-define-tag
    :name 'code-maat-viewer
    :cwd (projectile-project-root))


  (fn/prodigy-define-service
   :name fbn/code-maat-viewer-service-name
   :tags '(npm npm-runner code-maat-viewer)
   :args `("run" "start")

   ;; Custom Binding
   :bind-command-name "code-maat-viewer"
   :bind-map fn/prodigy-map
   :bind (kbd "c c"))

  (prodigy-start-service (prodigy-find-service fbn/code-maat-viewer-service-name)))
