import "./Error404.css"
export function Error404() {
    return (
        <div id="containerError">
            <h1 id="titleError">Not found page error 404</h1>
            <img id="imageError" src="robot.png" alt="imagenError"></img>
            <h3 id="subtitleError">this page does not exist, check that the selected path is correct</h3>
        </div>
    )
}
