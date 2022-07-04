import React from 'react';

class Footer extends React.Component {
    render() {
        return (
          <footer className="bg-black flex flex-col justify-between sm:flex-row text-white p-4">
          <p className="text-center flex items-center mt-3 sm:mt-0 justify-center sm:text-left"><strong>© 2022 Copyright</strong></p>
          <div>
            <p className="text-center mt-3 sm:mt-0 sm:text-right">Feito por <strong>Bruno Gabryell Cabral da Silva</strong></p>
            <p className="text-center sm:text-right">com <strong>HTML</strong>, <strong>CSS</strong>, <strong>Javascript</strong>, <strong>React</strong>, <strong>Tailwind</strong> e <strong>Framer Motion</strong></p>
          </div>
        </footer>
      );
    }
}

export default Footer;