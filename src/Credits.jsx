import React, { Component } from "react";

setTimeout(() => {
  document.getElementById("mainmenu5").addEventListener("click", () => {
    document.location.reload();
  });
}, 200);

class Credits extends Component {
  state = {};
  render() {
    return (
      <div>
        <button className="bckmm" id="mainmenu5">
          Back
        </button>
        <div id="creditdiv">
          <div>
            <h1>Thanks for checking out English-Learninator!</h1>
            <h2>
              Created By digszamgang
              <br />
              <br />
              Etlinger András
              <br />
              Besenyei Tamás
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Credits;
