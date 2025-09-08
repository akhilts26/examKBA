
import { log } from "console";
import readline from "readline"

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let bookArray = new Map()
let IssueArray = new Map() 
function displayOption(){
    console.log(`
-------------------------------------
1. Add book details
2. View Book details
3. Issue book to user
4. View issued books list
5. Return Books
6. Delete Books
7. Exit
-------------------------------------`);
    rl.question('enter Option (1/2/3/4/5/6) : ',readOption)
}
displayOption()
function readOption(option){
    
    
    if(option.trim() != ''){
      
        
        switch(option.trim()){
        
            
            case "1" :
                rl.question(`\nAdd Book titie : `,(bookName)=>{
                    rl.question(`Add Author name : `,(autonrName)=>{
                        if(bookName.trim()!='' && autonrName.trim()!=''){
                            let arrayIndex = bookArray.size +1
                            bookArray.set(arrayIndex,[bookName.trim(),autonrName.trim()])
                            console.log(`Details added successfully`)
                        }else{
                            console.log(`Invalid book details`);
                            
                        }
                        displayOption()
                    })
                })
                break

            case "2" :
                console.log(`\n`)
                if (bookArray.size>0){
                    bookArray.forEach((value,key)=>{
                        console.log(`Id[${key}]\t${value[0]}\t${value[1]}`);
                        
                    })
                    displayOption()

                }else{
                    console.log(`\nBook details is Empty`);
                    displayOption()
                }
            case "3" :
                rl.question(`\nEnter book id for issue : `,(id)=>{
                    if(bookArray.has(parseInt(id))){
                        bookArray.forEach((value,key)=>{
                            if (parseInt(id)==parseInt(key)){
                                let arrayIndex = IssueArray.size +1
                                IssueArray.set(arrayIndex,[value[0],value[1]])
                                console.log(`Details issued successfully`)
                            }
                        })
                        
                    }else{
                        console.log(`\nInvalid Id`);
                        
                    }
                    displayOption()
                })
                break
            
            case "4" :
                console.log('\n');
                
                if (IssueArray.size>0){
                    IssueArray.forEach((value,key)=>{
                        console.log(`Id[${key}]\t${value[0]}\t${value[1]}`);
                        
                    })
                    displayOption()
                }else{
                    console.log(`\nIssue Array is Empty`);
                    displayOption()
                }
                break
            
            case "5" :
                rl.question(`\nEnter book id for return : `,(id)=>{
                    if (IssueArray.has(parseInt(id))){
                        if(IssueArray.size)
                        IssueArray.delete(parseInt(id))
                        let tempArray = new Map()
                        IssueArray.forEach((value,key)=>{
                            let index = tempArray.size +1
                            tempArray.set(index,[value[0],value[1]])
                        })
                        IssueArray = tempArray
                        console.log(`Book retuned`);
                        displayOption()
                    }else{
                        console.log(`\nInvalid Id`);
                        displayOption()
                    }

                })
                break
            case "6":
                rl.question('\nEnter book id to delete : ',(id)=>{
                    if(bookArray.has(parseInt(id))){
                        bookArray.delete(parseInt(id))
                        let tempArray = new Map()
                        bookArray.forEach((value,key)=>{
                            let index = tempArray.size +1
                            tempArray.set(index,[value[0],value[1]])
                        })
                        bookArray = tempArray
                        console.log(`Book deleted `);
                        displayOption()
                    }else{
                        console.log(`\nInvlid id`);
                        displayOption()
                        
                    }
                })
                break
            case "7":
                console.log('\nExiting.....');
                
                rl.close()
                break

            default:
                console.log(`Invlid input`);
                displayOption()
                
        }
    }else{
        alert(`Invlaid input`)
    }
}
