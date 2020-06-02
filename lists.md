```lisp
; Дан список, сделать так, что бы каждое его значение встречалось в списке только один раз
(defun distinct (List)
  (cond ((null List) List)
        ((member (car List) (cdr List))
         (distinct (cdr List)))
        (t (cons (car List) (distinct (cdr List))))))  

(print (distinct '(1 2 3 1 4 5 2)))

; Дан список оставить в нем только элементы встречающиеся более одного раза
(defun onlyDuplicates (List)
  (distinct (cond ((null List) List)
        ((member (car List) (cdr List))
         (cons (car List) (onlyDuplicates (cdr List))))
        (t (onlyDuplicates (cdr List))))))

(print (onlyDuplicates '(1 2 3 1 4 5 2)))


; Дан список состоящий из списков, которые также могут состоять из списков - и так до бесконечности. 
; Найти сумму всех чисел в такой конструкции.
(defun recursiveSum (List)
     (cond ((null List) 0)
        ((numberp (car List))
         (+ (car List) (recursiveSum (cdr List))))
        (t (+ (recursiveSum (car List)) (recursiveSum (cdr List))))))

(print (recursiveSum '(1 2 3 (1 2 4))))

; Дан список, удалить все элементы, которые встречаются более одного раза
(defun dropDuplicates (List)
  (cond ((null List) List)
        ((member (car List) (cdr List))
         (remove (car List) (dropDuplicates (cdr List))))
        (t (cons (car List) (dropDuplicates (cdr List))))))  

(print (dropDuplicates '(1 2 3 1 4 5 2)))

; Дан список, разбить его на два подсписка так, чтобы в одном оказались 
; все элементы встречающиеся только один раз,
; а в другом все кто встречается более одного раза
(defun splitToDuplicatesAndDistinct (Lst) 
    (list (onlyDuplicates Lst) (dropDuplicates Lst))
)

(print (splitToDuplicatesAndDistinct '(1 2 3 1 4 5 2)))

; Дано два списка, объеденить их так чтобы, в результате оказались 
; только значения которые встретились по одному разу
(defun onlyUniqueInTwoLists (Lst1 Lst2) (dropDuplicates (append Lst1 Lst2)))

(print (onlyUniqueInTwoLists '(1 2 3 1 4) '(2 5 6 1)))

; Дано два списка, объединить их так, что бы внутри оказались только разные значения
(defun diff (Lst1 Lst2) 
    (cond ((null Lst1) Lst2)
        ((member (car Lst1) Lst2)
         (diff (remove (car Lst1) (cdr Lst1)) (remove (car Lst1) Lst2)))
        (t (diff (cdr Lst1) (cons (car Lst1) Lst2 )))))

 (print (diff '(1 2 3) '(2 3 4)))

; Дано два списка, объединить их так, что бы внутри оказались только одинаковые значения
(defun intersect (Lst1 Lst2) 
    (onlyDuplicates (append (distinct Lst1) (distinct Lst2))))

 (print (intersect '(1 2 2 3) '(2 3 3 4)))

; Дан список списков, объединить их так, что бы в итоговый список попали 
; только элементы встречающиеся более чем в одном списке, но в итоговм они должны быть один раз
(defun intersectMany (Lsts) (onlyDuplicates(reduce 'append (mapcar 'distinct Lsts))))

(print (intersectMany '((1 2 2 6 3) (2 3 3 8 4) (4 5 1))))

; Дан список списков, объеднить их так, что бы все элементы попали в итоговый список строго один раз
(defun dictinctMany (Lsts) (distinct(reduce 'append Lsts)))
(print (dictinctMany '((1 2 2 6 3) (2 3 3 8 4) (4 5 1))))

; Дан список, разбить его на два подсписка в соответствии с условием
(defun splitByCondition (condp lst) (list (remove-if condp lst) (remove-if-not condp lst)))
(print (splitByCondition 'numberp '(1 2 a b 3)))

; Дан список, сделать так, что бы все дубли шли друг за другом, при этом остальные значения не меняют своих мест
(defun count1 (a L)
  (cond
   ((null L) 0)
   ((equal a (car L)) (+ 1 (count1 a (cdr L))))
   (t (count1 a (cdr L)))))

(defun fillList (num acc counter)
   (if (eq counter 0)
        acc
       (fillList num (cons num acc) (- counter 1))))

(defun doublesInRow (List)
    (cond 
        ((null List) 
             List)
        ((member (car List) (cdr List))
            (append (fillList (car List) nil (count1 (car List) List)) (remove (car List) (doublesInRow (cdr List)))))
        (t (cons (car List) (doublesInRow (cdr List))))))

(print (doublesInRow '(4 1 6 2 3 1 2 4 4)))

```
