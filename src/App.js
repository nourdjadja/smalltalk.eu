import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import './App.css';

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.REACT_APP_FIREBASE_APP_ID);


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
    <nav>
        <span class="title">
          smalltalk.eu
        </span>

        <div>
        {user ? <SignOut /> : <SignIn />}
        </div>
    </nav>


      <section>
        {user ? <ChatRoom /> : <div className='chat'>
          Welcome. Sign in and start chatting on our global server ! :)
        </div>}
      </section>
    </div>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('')
  const sendMessage = async(e) => {
    e.preventDefault(); 
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text:formValue,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('')
  }

  return (
<div className='chat'>
<div>
      {messages && messages.map(msg => <ChatMessage message={msg} key={msg.id} />)}
    </div>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
       
      <button type='submit'>SEND</button>
    </form>
</div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button className="sign" onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className='sign' onClick={() => auth.signOut()}>Sign out</button>
  );
}

//-----------

let colorIndex = 0; // Indice de progression dans le spectre des couleurs
function createRandomSquare(color, posX, posY) {
  // Création de l'élément carré
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = color;

  // Taille aléatoire entre 5px et 50px
  const size = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  square.style.width = size + 'px';
  square.style.height = size + 'px';

  // Position aléatoire
  square.style.left = posX - size/2 + 'px'; // Centrer par rapport à la souris
  square.style.top = posY - size/2 + 'px'; // Centrer par rapport à la souris

  // Rotation aléatoire
  const rotation = Math.random() * 360;
  square.style.transform = `rotate(${rotation}deg)`;

  // Opacité aléatoire
  const opacity = Math.random();
  square.style.opacity = opacity;

  // Ajout au DOM
  document.body.appendChild(square);

  // Disparition en fade-out après 0.4s
  setTimeout(() => {
      square.style.transition = 'opacity 0.3s';
      square.style.opacity = 0;
      setTimeout(() => {
          square.remove();
      }, 300); // Attendre la fin de la transition
  }, 400); // Disparition après 0.4s
}

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculer la couleur en traversant le spectre hexadécimal
    const color = calculateColor();
    createRandomSquare(color, mouseX, mouseY);
});

// Fonction pour calculer la couleur en traversant le spectre hexadécimal
function calculateColor() {
    const frequency = 0.1; // Fréquence de changement de couleur
    const amplitude = 100; // Amplitude de la variation de couleur

    // Calculer les composantes RGB en fonction de l'indice de couleur
    const red = Math.sin(frequency * colorIndex + 0) * amplitude + 128;
    const green = Math.sin(frequency * colorIndex + (2 * Math.PI / 3)) * amplitude + 128;
    const blue = Math.sin(frequency * colorIndex + (4 * Math.PI / 3)) * amplitude + 128;

    // Incrémenter l'indice de couleur pour la prochaine couleur
    colorIndex++;

    // Retourner la couleur au format CSS
    return `rgb(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue)})`;
}


export default App;
