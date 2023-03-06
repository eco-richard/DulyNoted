import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotebooks } from '../../store/notebooks';

import NewNotebookForm from './NewNotebookForm';
import OpenModalButton from '../OpenModalButton';
import SideBar from '../SideBar/';
import NotebookBar from './NotebookBar';

import './Notebooks.css'

function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = Object.values(useSelector(state => state.notebook));
    const [loadNotebooks, setLoadNotebooks] = useState(false);
    useEffect(() => {
        dispatch(getNotebooks());
        setLoadNotebooks(true);
    }, [dispatch])

    if (!loadNotebooks) return null;

    const openNotebooks = (notebook) => {
        history.push(`/notebooks/${notebook.id}`);
    }

    return (
        <div className='max-container'>
        <SideBar />
        <div className='notebooks-wrapper'>
            <div className='notebooks-header'>
                <h2>Notebooks</h2>
                <div className='notebooks-number-new'>
                    <div className='notebooks-header-number'>
                        {notebooks.length} notebooks
                    </div>
                    <div className='notebooks-header-new'>
                        <OpenModalButton
                        className="add-notebook-button"
                        // buttonText={<i className="fa-solid fa-book-medical"/>}
                        buttonText="New Notebook"
                        modalComponent={<NewNotebookForm />}
                        />
                    </div>
                </div>
            </div>
             <div className='notebooks-body'>
                <div className='notebooks-body-bar-header'>
                    <div className='notebooks-bar-t-cb'>
                        <div className='notebooks-bar-title'>
                            TITLE
                        </div>
                        <div className='notebooks-bar-created-by'>
                            CREATED BY
                        </div>
                    </div>
                    <div className='notebooks-bar-updated'>
                        UPDATED
                    </div>
                </div>
                 {notebooks.map(notebook => (
                    <>
                     <div onClick={() => openNotebooks(notebook)} className="notebook-bar-wrapper">
                        <div className="notebook-arrow">
                        </div>
                        <div className='notebook-bar-tu'>
                        <div className="notebook-bar-title">
                            {`${notebook.title} (${notebook.notes.length})`}
                        </div>
                        <div className="notebook-bar-user">
                            {notebook.user.email}
                        </div>
                        </div>
                        <div className="notebook-bar-updated">
                            {notebook.updated_at}
                        </div>
                     </div>
                     </>
                 ))}
            </div>
        </div>
        </div>
    )
}

export default Notebooks;
