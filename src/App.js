import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: "#fff"
}
let fakeData  = {
  user: {
    name: 'Sound-Hound',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: "Kao", duration: 1524},
          {name: "Severina", duration: 1245},
          {name: "Adele", duration: 1245}
        ]
      },
      {
        name: 'Senna bella',
        songs: [
          {name: "Senna bella", duration: 1524},
          {name: "Love me like you do", duration: 1245},
          {name: "Gelly Goudling", duration: 1245}
        ]
      },
      {
        name: 'Another play list',
        songs: [
          {name: "King", duration: 1524},
          {name: "Fegg me", duration: 1245},
          {name: "King", duration: 1245}
        ]
      },
      {
        name: 'Playlisy yeat',
        songs: [
          {name: "Kaka", duration: 1524},
          {name: "Shak", duration: 1245},
          {name: "Shakira", duration: 1245}
        ]
      }
    ]
  }
}

class PlayListCounter extends Component {
    render(){
      return(
        <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
          <h2>{this.props.playlists.length} Playlists</h2>
        </div>
      );
    }
}

class HoursCounter extends Component {
    render(){
      let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
      }, [])
      let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
      }, 0)
      return(
        <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
          <h2>{Math.round(totalDuration / 60)} Hours</h2>
        </div>
      );
    }
}

class Filter extends Component {
  render(){
    return(
      <div style={defaultStyle}>
        <img />
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class PlayList extends Component {
  render(){
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>{playlist.songs.map((song, i) => <li key={i}>{song.name}</li>)}</ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      setAsAliseOfFakeData: {},
      filterString: ''
    }
  }
  componentDidMount(){
      setTimeout(() => {
        this.setState({setAsAliseOfFakeData: fakeData});
      }, 3000);
  }
  render() {
    let playListoRender = this.state.setAsAliseOfFakeData.user ? this.state.setAsAliseOfFakeData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.setAsAliseOfFakeData.user ?
          <div>
            <h1 style={{...defaultStyle, fontSize: "54px"}}>
              {this.state.setAsAliseOfFakeData.user.name}`s Playlist
            </h1>
            <PlayListCounter playlists={playListoRender} />
            <HoursCounter playlists={playListoRender} />
            <Filter onTextChange={text => this.setState({filterString: text})} />
            {
              playListoRender.map((playlist, i) => {
                return <PlayList key={i} playlist={playlist} />
              })
            }
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
