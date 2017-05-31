(require 'prodigy)

(with-eval-after-load 'prodigy
  (defconst fbn/code-maat-viewer-frontend-service-name "code-maat-viewer-frontend"
    "The code-maat-viewer frontend service name.")

  ;; Tags
  (prodigy-define-tag
    :name 'code-maat-viewer-frontend
    :cwd (projectile-project-root))

  (fn/prodigy-define-service
   :name fbn/code-maat-viewer-frontend-service-name
   :tags '(npm code-maat-viewer-frontend)
   :port 3000
   :args `("run" "start")

   ;; Custom Binding
   :bind-command-name "code-maat-viewer-frontend"
   :bind-map fn/prodigy-map
   :bind (kbd "c f"))

  (prodigy-start-service (prodigy-find-service fbn/code-maat-viewer-frontend-service-name)))
