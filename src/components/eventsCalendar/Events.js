const Events = (props) => {
    return  (
        <div style = {{marginTop: "80px"}}>
            <iframe src = "https://calendar.google.com/calendar/embed?src=3ohai70umocj5nd4ju4osii7s4mv4vu8%40import.calendar.google.com&ctz=America%2FNew_York" style={{borderWidth:0, resize: "both", overflowX: "scroll"}}
            width="100%" height= "600px" title  = "Event Calendar" />
        </div>
    )
}

export default Events;