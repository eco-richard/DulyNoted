import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch])

    if (notebooks.length === 0) return null;

    const openNotebooks = (notebook) => {
        history.push(`/notebooks/${notebook.id}`);
    }

    return (
        <>
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
                        buttonText="New Notebook"
                        modalComponent={<NewNotebookForm />}
                        />
                    </div>
                </div>
            </div>
             <div className='notebooks-body'>
                <div className='notebooks-body-bar-header'>
                    <div className='notebooks-bar-title'>
                        TITLE
                    </div>
                    <div className='notebooks-bar-created-by'>
                        CREATED BY
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
                        <div className="notebook-bar-title">
                            {notebook.title}
                        </div>
                        <div className="notebook-bar-user">
                            {notebook.user.email}
                        </div>
                        <div className="notebook-bar-updated">
                            {notebook.updated_at}
                        </div>
                     </div>
                     </>
                 ))}
            </div>
        </div>
        </>
    )
}

export default Notebooks;
