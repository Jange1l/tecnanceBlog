---
template: BlogPost
path: /LargestMagicSquareInMatrix
date: 2020-08-29T12:12:25.364Z
title: 'Finding the largest Magic Square in a matrix'
thumbnail: /assets/cpu.gif
metaDescription: Threaded solution in python for finding the largest Magic Square in a matrix.
author: Juan Suarez
---

# Introduction

The Magic Square problem is quite a popular one when it comes to matrix manipulation interview problems. However, not too long ago I encountered a version of this problem that didn't let me sleep at night. 

# The Problem

In a matrix of size N x N find the largest Magic Square. If you don't know what a Magic Square is basically it is a square where all the rows, columns, and diagonals of length N equal the same number. 

For example a square with only ones could be a Magic Square because no matter what way you count you are adding the same amount of ones. Here is a link to a program that generates [Magic Squares](https://www.dcode.fr/magic-square)

# The Solution

I am sure there are multiple ways to solve this problem more efficiently, but I couldn't find them. I scavenged the internet to find a dynamic solution for this problem with no luck, so I resorted to the next best thing. 

The solution that I came up with uses threads to find all squares of size k x k in the matrix of N x N. Then, it uses checks every sub-square of size k x k in the matrix. If the square is a Magic Square it's sum gets added to memory. At the end the program finds the largest sum that got saved, hence finding the largest Magic Square. 

# How to use 

At the bottom there are a few different matrices of different sizes. Feel free to play around with them to test different inputs. If you dont feel like manually changing the matrices, you can randomly generate a matrix of size N x N with mat4. 

mat4 is already set up, all you need to do is specify the range of the numbers you want in the matrix and the size. Remember it has to be a square matrix, so choose equal numbers for the sizes. 

```python
import logging
import threading
import numpy as np




def is_magic_square_of_size(matr, x):

    # Columns
    columns_sum = sum(matr[0])
    for i in range(1, x):
        new_sum = sum(matr[i])

        if new_sum != columns_sum:
            return "False", 0

    # Rows
    row_sum = 0
    for i in range(x):
        new_sum = 0
        for j in range(x):
            if (i < 1):
                row_sum += matr[j][i]
                new_sum += matr[j][i]
            else:
                new_sum += matr[j][i]
        if (new_sum != row_sum):
            return "False", 0

    # Diagonals
    left_dig = 0
    right_dig = 0
    for i in range(1,3):
        for j in range(x):
            if(i == 1):
                left_dig += matr[j][j]
            if(i ==2):
                right_dig += matr[x - 1 - j][j]

    if (left_dig != right_dig):
        return "False", 0
    elif(left_dig != 0):
        print("True", matr)
        return "True", left_dig
    else:
        return "False", 0

def creat_squares_of_size(x, matr):
    squares = []

    for i in range(0,(len(matr) - x) + 1):
        temp = []
        for j in range(0,(len(matr) - x)+ 1 ):

            for p in range(0,x):
                temp2 = []
                for q in range(0,x):
                    temp2.append(matr[p + i][q + j])
                temp.append(temp2)
            squares.append(temp)
            temp = []
    #print(squares)
    return squares


def thread_function(size_of_square, matrix):
    squares = creat_squares_of_size(size_of_square, matrix)
    sizes = []

    for square in squares:
        isSquare, sum = is_magic_square_of_size(square, size_of_square)
        if (isSquare == "True"):
            sizes.append(sum)

    if(len(sizes) > 0):
        print("Max magic sqaure of size", size_of_square, "has sum of", max(sizes))
        max_size.append(max(sizes))





if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,
                        datefmt="%H:%M:%S")

    mat = [[2, 7, 6, 1],
           [9, 5, 1, 1],
           [4, 3, 8, 1],
           [4, 3, 8, 1]]

    mat2 = [[8,2,4,3,7,4,3,5,3,4],
            [10,7,5,5,9,3,10,1,4,5],
            [10,6,64,2,3,61,60,6,7,57],
            [3,8,9,55,54,12,13,51,50,16],
            [20,5,17,47,46,20,21,43,42,24],
            [9,4,40,26,27,37,36,30,31,33],
            [7,3,32,34,35,29,28,38,39,25],
            [9,7, 41,23,22,44,45,19,18,48],
            [6,4,49,15,14,52,53,11,10,56],
            [6,9,8,58,59,5,4,62,63,1]]

    mat3= [
        [14,5,5,8,8,14,11,3,8,15,2,11,6,8,5,8,2,9,14,5],
        [14,3,3,5,10,1,15,8,12,12,13,2,5,1,3,6,13,4,11,2],
        [4,9,1,6,9,9,12,2,7,7,10,14,5,14,5,12,8,12,3,10],
        [7,4,8,12,7,9,5,15,2,4,5,5,5,7,1,11,2,15,7,12],
        [11,10,8,8,4,9,8,12,5,3,13,5,1,1,8,15,13,5,4,6],
        [5,2,7,2,15,15,6,15,12,12,7,4,5,4,3,12,11,9,12,5],
        [4,4,4,4,4,14,4,2,7,9,12,2,5,5,6,8,4,2,11,7],
        [4,4,4,4,4,14,4,12,4,15,10,11,12,3,14,8,15,11,14,1],
        [4,4,4,4,13,8,11,11,1,11,15,15,4,8,8,4,11,13,7,2],
        [4,4,4,4,2,15,5,5,14,13,7,6,5,1,15,6,1,4,13,2],
        [6,2,10,6,13,1,1,12,9,6,12,12,14,3,15,7,3,1,2,4],
        [8,13,6,13,8,11,2,11,3,6,15,4,8,6,9,10,2,12,8,15],
        [1,3,4,6,6,14,6,3,9,14,6,8,2,10,2,12,13,2,3,4],
        [11,13,5,8,3,11,9,13,11,8,3,15,3,6,12,8,7,13,8,11],
        [7,11,9,12,9,15,9,10,8,14,4,7,2,14,6,10,12,5,12,7],
        [3,12,11,4,11,3,10,15,14,10,2,15,2,4,4,3,9,7,5,5],
        [8,1,5,6,15,15,13,9,12,14,10,12,2,4,4,4,4,9,12,3],
        [3,9,1,3,11,13,10,12,3,3,14,9,12,3,12,4,7,3,1,14],
        [15,8,9,13,5,13,3,10,14,13,1,15,1,5,13,14,12,1,10,13],
        [9,2,11,2,11,10,2,3,12,14,9,7,5,5,15,3,6,9,3,6]
    ]

    mat4 = np.random.randint(0, 5, size=(10, 10))
    #thread_function(3,mat)
    max_size = []

    threads = list()
    for index in range(2,len(mat4)):
        print("Main    : create and start thread %d.", index)
        x = threading.Thread(target=thread_function, args=(index,mat4))
        threads.append(x)
        x.start()

    for index, thread in enumerate(threads):
        logging.info("Main    : before joining thread %d.", index)
        thread.join()
        logging.info("Main    : thread %d done", index)

    print("Max sum for all magic sqaures is", max(max_size), max_size)
    print(mat4)
```