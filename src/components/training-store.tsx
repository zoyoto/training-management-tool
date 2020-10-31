export class TrainingStore {
  constructor(initialState: TrainingModel[]) {
    this.state = initialState;
  }
  state: TrainingModel[];

  addItem = (title: string, description: string, people: string, budget: number) => {
    let newItem = new TrainingModel(this.state.length++, title, description, people, budget);
    this.state.push(newItem);
  }

  editItem = (uid: number, title: string, description: string, people: string, budget: number) => {
    let existingItem = this.state.find(item => item.uid === uid);
    if (existingItem == null) return;
    existingItem.title = title;
    existingItem.description = description;
    existingItem.people = people;
    existingItem.budget = budget;
  }

  removeItem = (uid: number) => {
    let newState = this.state.filter((item) => item.uid !== uid);
    this.state = newState;
  }

  uploadItem = (modelStr: any) => {
    if(modelStr==null || modelStr=='' || modelStr.length==0){
      return;
    }

    let content = new String(modelStr);
    let sp: string[] = content.split("\n");
    if (sp.length > 1) {
      for (let i: number = 0; i < sp.length; i++) {
        let text: string = sp[i];
        console.log(text);
        if (text && text.length > 0) {
          try{
            var model = JSON.parse(text);
            console.log("model"+model);
            model.uid = this.state.length++;
            this.state.push(model);
          }catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
}

export class TrainingModel {
  uid: number;
  title: string;
  description: string;
  people: string;
  budget: number;
  constructor(uid: number, title: string, description: string, people: string, budget: number) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.people = people;
    this.budget = budget;
  }
}