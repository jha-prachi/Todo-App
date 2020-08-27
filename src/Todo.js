import React,{useState} from 'react';
import App from './App';
import './Todo.css';
import { ListItem, List, ListItemText, ListItemAvatar, Avatar, ImageIcon,Modal } from '@material-ui/core';
import db from './firebase';
import { Button } from '@material-ui/core';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
         backgroundColor:"grey",
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        borderRadius: 7,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
       
    
    },
   
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}




const Todo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const [modalStyle] = React.useState(getModalStyle);
    
    const handleOpen = (event) => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

   const updatetodo = () => {
        // update the todo with new input
        // set is the way the update things in my db
        db.collection('todos').doc(props.todo.id).set({
          todo:input 
        }, { merge: true })
        // merge : appending in the collection

        setOpen(false)
    }

    const body = (
        
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Want to add Something ?</h2>
           
             {/* rather than empty String,I want to show pichla content when i click on edit */}
            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
            <Button variant="contained" color="primary" onClick={updatetodo}>Update Todo</Button>
        </div>
    );
   
    return (
        <>
            <Modal 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                >
                    {body}
                </Modal>
       
                <div className="add-list-css">
                    <List className="todo_list">
                        <ListItem>
                            <ListItemAvatar>
                            </ListItemAvatar>
                        <ListItemText className="to-do-deco" primary={props.todo.todo} />
                    
                   
                        <Button className="pencil" type="button" onClick={handleOpen} startIcon={<EditIcon />}></Button>
                        <DeleteForeverRoundedIcon className="pen" onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
                    </ListItem>
           
            
                    </List>
                    {/* <li>{props.text}</li> */}
             </div>
             </>
    );
}

export default Todo;