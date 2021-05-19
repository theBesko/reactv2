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
              var createdBy=[]; <br /> <br /> createdBy.push('Etlinger András'); <br />
              createdBy.push('Besenyei Tamás');
              <br />
              <br />
              const teamSize = createdBy.length;
              <br />
              console.log(teamSize); // 2!!

            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Credits;
