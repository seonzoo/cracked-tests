var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');

var Router     = ReactRouter.Router;
var Route      = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;


/*
  <App/>
*/
var App = React.createClass({
    render : function(){
        return(

           <main>

              <Messages msg="working"/>

              <Transport/>

              <Timeline/>

              <Channels/>

              <Mixer/>

           </main>

        )
    }
});



/*
  <Messages/>
*/
var Messages = React.createClass({
    render : function(){
        return(

           <header>
               <p>{ this.props.msg }</p>
           </header>

        )
    }
});



/*
  <Transport/>
*/
var Transport = React.createClass({

    render : function(){
        return(

            <div className="transport">
                <button type="button" className="play">play</button>
                <button type="button" className="addRow">+ch</button>
                <input  type="text" value="" className="bpm" size="4" />
            </div>

        )
    }

});



/*
  <Samples/>
*/
var Timeline = React.createClass({
    render : function(){
        return(


          <div id="timeline">
              <div id="playhead"></div>
          </div>


        )
    }
});




/*
  <Channels/>
*/
var Channels = React.createClass({
    render : function(){
        return(

            <div className="channels">

            </div>

        )
    }
});




/*
  <Mixer/>
*/
var Mixer = React.createClass({
    render : function(){
        return(


            <div className="ch-ctrl" data-channel="0">

                <div className="current">--</div>

                <div className="wav-sound"><select className="option-wav"></select></div>

                <div className="slider vol">
                    <div className="ctrl"></div>
                    <div className="num">--</div>
                    <div className="label">Vol</div>
                </div>

            </div>


        )
    }
});






ReactDOM.render(<App/>, document.querySelector('#main') );
