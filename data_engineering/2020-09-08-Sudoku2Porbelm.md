---
template: BlogPost
path: /Sudoku2_problem 
date: 2020-09-08T12:12:25.364Z
title: 'Check that this is a valid sudoku board'
thumbnail: /assets/cpu.gif
metaDescription: Solution for codesignal sudoku2 problem 
author: Juan Suarez
---

```python
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