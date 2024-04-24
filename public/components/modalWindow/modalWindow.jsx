// import React from 'react';
// import ReactDOM from 'react-dom';

// export class modalWindow {
//     constructor(props, parent) {
//       props = {
//       sections: [
//         {
//             name: 'inputBar', // (inputBar | graph | ...) - то, что нам надо отобразить в части модального окна (выбор комнат это inputBar, для изменения цены graph)
//             elements: [
//                 {
//                     name: 'checkbox',
//                     label: 'Квартира',
//                 },
//                 {
//                     name: 'checkbox',
//                     label: 'Дом',
//                 },
//             ]
//         },
//         {
//             name: 'inputBar',
//             elements: [
//                 {
//                     name: 'checkbox',
//                     label: '1',
//                 },
//                 {
//                     name: 'checkbox',
//                     label: '2',
//                 },
//                 {
//                     name: 'checkbox',
//                     label: '3',
//                 },
//             ]
//         },
//       ]
//     }
//         this.props = props;
//         this.parent = parent;
//     }

//     renderSection(section, index) {
//         return (
//           <div className="modal-section" key={index}>
//             <h3>{section.name}</h3>
//             {section.elements.map((element, idx) => (
//               <div key={idx} className="modal-element">
//                 {element.name === 'checkbox' && (
//                   <label>
//                     <input type="checkbox" /> {element.label}
//                   </label>
//                 )}
//               </div>
//             ))}
//           </div>
//         );
//       }

//       render() {
//         const { sections } = this.props;
//         console.log(this.props);
//         console.log(sections);

//         return (
//           <div className="modal-window">
//             <h2>Modal Title</h2>
//             {sections.map((section, index) => this.renderSection(section, index))}
//           </div>
//         );
//       }

// }

// const mWindow = new modalWindow({}, 'app');
// document.getElementById('app').innerHTML = mWindow.render();

// /** @jsx wind */

// const wind = (tag, props) => {
//   const elem = document.createElement(tag);

//   Object.keys(props || {}).forEach(k => {
//     if (k === 'style') {
//       Object.keys(props[k]).forEach(sk => {
//         elem.style[sk] = props[k][sk];
//       });
//     } else {
//       elem[k] = props[k];
//     }
//   });

//   return elem;
// }

// document.getElementById('app').appendChild(<div>hello<div>world</div></div>);
