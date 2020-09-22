---
template: BlogPost
path: /Sudoku2_problem 
date: 2020-09-08T12:12:25.364Z
title: 'Check the validity of a sudoku board'
thumbnail: /assets/cpu.gif
metaDescription: Solution for codesignal sudoku2 problem 
author: Juan Suarez
---

# Introduction

I dont know when you might need to check if you have a valid sudoku board, but if you do here is one way to do it. 

# The Problem

Given a typical 9x9 sudoku board, check if it violates any of the rules or if it is a valid board arrangement. The rules are as follows: 

- Each row contains NOT more than one of the same number from 1 to 9
- Each column contains NOT more than one of the same number from 1 to 9
- Each 3x3 grid contains NOT more than one of the same number from 1 to 9

# The Solution

Below I implemented a brute force approach that checks all of the above conditions to see if we have a valid sudoku board or not. First we check the all columns in the grid, then we check all the rows, and finally we check all the 3x3 subgrids. 


# How to use 

To test this code simply create a 9x9 matrix representing a sudoku grid with different types of inputs. 


```python

# Sample boards to try out 

#VALID BOARD
board = [[1, 4, 7, 0, 0, 0, 0, 0, 3],
        [2, 5, 0, 0, 0, 1, 0, 0, 0],
        [3, 0, 9, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 2, 0, 0, 0, 4],
        [0, 0, 0, 4, 1, 0, 0, 2, 0],
        [9, 0, 0, 0, 0, 0, 6, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 9],
        [4, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 1, 0, 0, 8, 0, 0, 7]]
#INVALID BOARD 
board2 = [[1, 4, 4, 0, 0, 0, 0, 0, 3],
         [2, 5, 0, 0, 0, 1, 0, 0, 0],
         [3, 0, 9, 0, 0, 0, 0, 0, 0],
         [0, 8, 0, 0, 2, 0, 0, 0, 4],
         [0, 0, 0, 4, 1, 0, 0, 2, 0],
         [9, 0, 0, 0, 0, 0, 6, 0, 0],
         [0, 0, 3, 0, 0, 0, 0, 0, 9],
         [4, 0, 0, 0, 0, 2, 0, 0, 0],
         [0, 0, 1, 0, 0, 8, 0, 0, 7]]

def sudoku2(grid):
    
    # Check all columns 
    for i in range(0, len(grid)):
        columns = {}
        for j in range(0, len(grid)-1):
            
            if grid[(len(grid)-1) - j][i] in columns and grid[(len(grid)-1) - j][i] != '.':
                
                print("COLUMN",columns, grid[(len(grid)-1) - j][i], (i,j))
                return False 
            else:
                columns[grid[(len(grid)-1) - j][i]] = 1
            
    # Check all rows 
    for i in range(0, len(grid)):
        rows = {}
        for j in range(0, len(grid)):
            print("rows", i,j)
            if grid[i][(len(grid)-1) - j] in rows and grid[i][(len(grid)-1) - j] != '.':
                
                print("ROW",rows, grid[i][(len(grid)-1) - j], (i,j))
                return False 
            else:
                rows[grid[i][(len(grid)-1) - j]] = 0
                
    # Check all subgrids 
    for i in range(3, len(grid)+3,3):
        #print("cols", i-3)
        for x in range(3, len(grid) + 3, 3):
            #print("row", x)
            temp = []
            sub_3 = {}
            for j in range((i-3), i):
                #print(i-3,x,[j,i])
                temp = grid[j][(x-3):x]
                #print(temp)
                for l in temp:
                    if l in sub_3 and l != '.':
                        #print(sub_3, l)
                        return False
                    elif(l != '.'):
                        sub_3[l] = l
    return True    
```