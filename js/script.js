const listTask=document.querySelector('#listTask');

const getLocalStorage=()=>{
     let arr;                                     
     if(localStorage.getItem('task')===null){     
          arr=[];                                      
     }else{
          arr=JSON.parse(localStorage.getItem('task'));                                   //% getItem(clave) – obtener el valor de clave
     }                                                  
     return arr;                                  
};

const createList=(element)=>{
     const p=document.createElement('p');
     p.setAttribute('class','parraf');
     p.textContent=element;
     
     const buttonUpdate=document.createElement('button');
     buttonUpdate.className='buttonEdit';
     buttonUpdate.textContent='U';
     p.insertAdjacentElement("beforeend", buttonUpdate);

     const buttonDelete=document.createElement('button');
     buttonDelete.className='buttonDelete';
     buttonDelete.textContent='D';
     p.insertAdjacentElement("beforeend", buttonDelete);
     
     listTask.appendChild(p);
};

const screenTask=(arr)=>{
     arr.forEach(element => {
          createList(element);
     });
};

const loadLocalStorage=()=>{
     let taskArr=getLocalStorage();
     screenTask(taskArr);
};

const setTask=(e)=>{
     e.preventDefault(); 
     const task = document.getElementById('task').value;
     const taskRadio = document.querySelector('input[name="taskRadio"]:checked').value;
     let contentTask = `${taskRadio} | ${task} `;
     createList(contentTask);
     setLocalStorage(contentTask);
};

const setLocalStorage=(task)=>{
     let arrTask=getLocalStorage();
     arrTask.push(task);                                    
     localStorage.setItem('task',JSON.stringify(arrTask));  
}

const eraseTask=(e)=>{
     if(e.target.className==='buttonDelete'){ 
          eraseLocalStorage(e.target.parentElement.textContent);
          e.target.parentElement.remove();
     }
}

const eraseLocalStorage=(task)=>{
     let deleteTask=task.substring(0,task.length-2); 
     let arrTask=getLocalStorage();
     arrTask.forEach( (element,i) =>{
          if(element===deleteTask){
               arrTask.splice(i,1);
          }
     });
     localStorage.setItem('task',JSON.stringify(arrTask));
};

const editTask=(e)=>{
     const buttonUpdate=document.getElementById('buttonUpdate');
     const boxU=document.getElementById('formUpdate');
     const boxT=document.getElementById('listTask');

     let iniDisplay=boxT.style.display;
     boxT.style.display='none';
     boxU.style.display='block';
     let chain=e.target.parentElement.textContent;
     chainCut=chain.substring(0,chain.length-2);
     const chainEnd=chainCut.slice(chainCut.indexOf("|")+1,chainCut.length);
     document.getElementById('taskU').value=chainEnd;
     const chainIni=chain.slice(0,chainCut.indexOf("|")-1);
     const radioU=document.querySelectorAll('input[name="updateRadio"]');
     radioU.forEach(element=>{
          if(element.value===chainIni){
               element.checked=true;
          }
     });

     buttonUpdate.addEventListener('click',()=>{
          eraseUpdateStorage(chain);
          const task = document.getElementById('taskU').value;
          const taskRadio = document.querySelector('input[name="updateRadio"]:checked').value;
          let contentTask = `${taskRadio} | ${task} `;
          createList(contentTask);
          setLocalStorage(contentTask);
          boxT.style.display=iniDisplay;
          boxU.style.display='none';
     });
}

const eraseUpdateStorage=(task)=>{
     let updateTask=task.substring(0,task.length-2);
     let arrTask=getLocalStorage();
     arrTask.forEach( (element,i) =>{
          if(element===updateTask){
               arrTask.splice(i,1);
          }
     });
     localStorage.setItem('task',JSON.stringify(arrTask));
};

const eventListener=()=>{
     document.getElementById('formUserTask').addEventListener('submit', setTask);
     document.addEventListener('DOMContentLoaded',loadLocalStorage); 
     document.querySelector('#listTask').addEventListener('click', (e)=>{ 
          if(e.target.className==='buttonDelete'){
               eraseTask(e);
          }
          if(e.target.className==='buttonEdit'){
               editTask(e);
          }
          
     });
}

eventListener();
