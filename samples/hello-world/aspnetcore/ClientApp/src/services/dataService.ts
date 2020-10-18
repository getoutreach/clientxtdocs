import eventStore from '../stores/EventStore';

class DataService {
  public getInfo = async () => {
    if (!eventStore.token) {
      throw new Error("undefined token");
    }
    
    const url = `${window.location.origin}/proxy/info`;
    var r = await fetch(url, {
      headers: {
        "x-outreach-token": `${eventStore.token}`,
      }
    });

    return r.json();
  }
  
}

export default new DataService();