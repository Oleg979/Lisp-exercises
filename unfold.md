```lisp
(defun _unfold (L N)
    (if (null L)
        nil
        (if (atom (car L))
            (append (list(list (car L) N)) (_unfold (cdr L) N))
            (cons (_unfold (car L) (+ 1 N)) (_unfold (cdr L) N))
        )
    )
)

(defun unfold (L)
    (_unfold L `0)
)

(print (unfold `(a b (c d (e f g (h) i j)))))
```
