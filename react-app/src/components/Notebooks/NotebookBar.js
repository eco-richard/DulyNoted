

function NotebookBar( {notebook} ) {
    console.log("NOTEBOOKS BAR");
    return (
        <div className="notebook-bar-wrapper">
            <div className="notebook-arrow">
            </div>
            <div className="notebook-bar-title">
                {notebook.title}
            </div>
            <div className="notebook-bar-username">
            </div>
        </div>
    );
}

export default NotebookBar;
