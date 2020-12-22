import React from "react";
import NavBar from "./NavBar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";


class NasaPhoto extends React.Component{

    constructor(){
        super();
        this.state = {
            copyright: null,
            date: null,
            explanation: null,
            hdurl: null,
            title: null,
            url: null,
            errormsg: null,
            showhd: false,
        };
    }

    componentDidMount() {
        this.fetchAPOD();
    }
    
    fetchAPOD = async (queryparam = "") => {
        try {
            const url = 'https://api.nasa.gov/planetary/apod';
            const apikey = 'xbfqGUDCRGcPG92J0eLBjSx6dooQfYCuldA1grwN';
            const apodurl = `${url}?api_key=${apikey}${queryparam}`;
            const response = await fetch(apodurl);
            const data = await response.json();
            if (data.error === undefined && data.code === undefined) {
            this.setState({
                copyright: data.copyright,
                date: data.date,
                explanation: data.explanation,
                hdurl: data.hdurl,
                title: data.title,
                url: data.url,
                media_type: data.media_type,
            });
            } else if (data.error !== undefined) {
            this.setState({
                errormsg: data.error.message,
            });
            } else if (data.code !== undefined) {
            this.setState({
                errormsg: data.msg,
            });
            }
        } catch (error) {}
    };

    fetchAPODOnDate = (date) => {
        const month = parseInt(date.getMonth()) + 1;
        const userdate = `${date.getFullYear()}-${month}-${date.getDate()}`;
        const queryparam = `&date=${userdate}`;
        this.fetchAPOD(queryparam);
      };

    showURLImage = (url) => {
        if (url !== null) {
          if (this.state.media_type==="image") {
            return (
                <img
                src={url}
                alt={this.state.title}
                className="photo"
              />
            );
          } else {
            return (
                <iframe
                title="space-video"
                src={this.state.url}
                frameBorder="0"
                gesture="media"
                allow="encrypted-media"
                allowFullScreen
                className="photo"
              />
            );
          }
        } else {
          return <div></div>;
        }
    };

    render(){

        return (
            <>
                <NavBar />
                
                <div className="filter">
                    <span>Pick a date:</span>
                    <DatePicker
                        clearIcon={null}
                        format="yyyy-MM-dd"
                        minDate={new Date("Jun 16, 1995")}
                        maxDate={new Date()}
                        onChange={this.fetchAPODOnDate}
                        value={this.state.date ? new Date(this.state.date) : new Date()}
                        className="datepicker"
                    />
                </div>
            
                <div className="nasa-photo">
        
                    {this.showURLImage(this.state.url)}

                    <div>
                        <h1>{this.state.title}</h1>
                        <p className="date">{this.state.date}</p>
                        <p className="explanation">{this.state.explanation}</p>
                    </div>
                </div>
            </>
          );

    }
}

export default NasaPhoto;