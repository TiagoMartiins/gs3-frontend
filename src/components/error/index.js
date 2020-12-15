import React from 'react';
import  './err.css'
 
const Error = ({ err }) => {
    return (
        <div class="quadrado">
        <div class="ui-g">
            <div class="ui-g-1">
            </div>
            <div class="ui-g-6">
                <div class="ops">
                    OOPS!
                </div>
                <div class="mensagem-erro">
                    {err}
                </div>
            </div>
        </div>  
    </div>
    )
  }
  Error.propTypes = {
    err: "",
  };

  export default Error;