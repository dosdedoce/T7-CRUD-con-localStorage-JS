const listTask=document.querySelector('#listTask');

//! Carga los datos si hay en el localStore
const getLocalStorage=()=>{
     let arr;                                     //! Declaro una variable arr
     if(localStorage.getItem('task')===null){     //* Si no hay nada en el LocalStorage
          arr=[];                                 //# Creo una matriz
     }else{
          arr=JSON.parse(localStorage.getItem('task')); //! convertir JSON de vuelta a un objeto                                      //% getItem(clave) – obtener el valor de clave
     }                                                  
     return arr;                                  //? Retorna un array
};

//% crea UN elemento en la lista
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

//* Recorre el array creando los elementos en la lista
const screenTask=(arr)=>{
     arr.forEach(element => {
          createList(element);
     });
};

//? 
const loadLocalStorage=()=>{
     let taskArr=getLocalStorage();     //? Es un array
     screenTask(taskArr);
};


//# Inserta una tarea, saca los datos del form, crea el nuevo elemento en la lista
const setTask=(e)=>{
     e.preventDefault(); 
     const task = document.getElementById('task').value;
     const taskRadio = document.querySelector('input[name="taskRadio"]:checked').value;
     let contentTask = `${taskRadio} | ${task} `;
     createList(contentTask);
     setLocalStorage(contentTask);
};

//! Carga los datos en localStorage
const setLocalStorage=(task)=>{
     let arrTask=getLocalStorage();
     arrTask.push(task);                                    //* Introduce la tarea en una matriz
     localStorage.setItem('task',JSON.stringify(arrTask));  //? carga los datos en el localStorage
     //? setItem(campo, valor) 
     //? si valor no es un array, y hay valores en localStorage, los pisa y los pierdes
     //% JSON.stringify(array) transforma el array en un string
}

const eraseTask=(e)=>{
     if(e.target.className==='buttonDelete'){ //ME aseguro que pulso las clase buttomDelete
          eraseLocalStorage(e.target.parentElement.textContent);
          // console.log(e.target.parentElement.textContent);
          // console.log(e.target.parentElement.innerText);
          e.target.parentElement.remove();
     }
}

const eraseLocalStorage=(task)=>{
     let deleteTask=task.substring(0,task.length-2); //value de localStorage
     let arrTask=getLocalStorage();
     arrTask.forEach( (element,i) =>{
          if(element===deleteTask){
               arrTask.splice(i,1);
          }
     });
     localStorage.setItem('task',JSON.stringify(arrTask));
};

const editTask=(e)=>{
     let iniDisplay;
     const boxU=document.getElementById('formUpdate');
     const boxT=document.getElementById('listTask');
     iniDisplay=boxT.style.display;
     boxT.style.display='none';
     boxU.style.display='block';
     let chain=e.target.parentElement.textContent;
     chainCut=chain.substring(0,chain.length-2);
     // console.log(chain.indexOf("|"));
     const chainEnd=chainCut.slice(chainCut.indexOf("|")+1,chainCut.length);
     document.getElementById('taskU').value=chainEnd;
     /*
     % Esto es para dar el radio button el valor que tiene
     */
     const chainIni=chain.slice(0,chainCut.indexOf("|")-1);
     const radioU=document.querySelectorAll('input[name="updateRadio"]');
     radioU.forEach(element=>{
          if(element.value===chainIni){
               element.checked=true;
          }
     });

     const buttonUpdate=document.getElementById('buttonUpdate');
     buttonUpdate.addEventListener('click',()=>{
          editLocalStorage(chain);
          const task = document.getElementById('taskU').value;
          const taskRadio = document.querySelector('input[name="updateRadio"]:checked').value;
          let contentTask = `${taskRadio} | ${task} `;
          createList(contentTask);
          setLocalStorage(contentTask);
          boxT.style.display=iniDisplay;
          boxU.style.display='none';
     });
}

const editLocalStorage=(task)=>{
     let updateTask=task.substring(0,task.length-2); //value de localStorage
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
     // document.querySelector('#listTask').addEventListener('click', eraseTask);
     document.addEventListener('DOMContentLoaded',loadLocalStorage); //% Haya Cargado llama function
     document.querySelector('#listTask').addEventListener('click', (e)=>{ 
          if(e.target.className==='buttonDelete'){
               eraseTask(e);
          }
          if(e.target.className==='buttonEdit'){
               editTask(e);
               // console.log(e.target.className);
          }
          
     });
}

eventListener();
