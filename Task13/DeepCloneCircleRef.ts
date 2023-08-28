class FateEventObject {
    public eventFlow() {
        console.log(`Fate event object flow.`);
        this.begin();
    }

    protected begin() {
        console.log(`Fate event object flow begin`);
        this.doSomething();
    }

    protected doSomething() {
        console.log(`Fate event do something.`);
        this.end();
    }

    protected end() {
        console.log(`Fate event object flow end.`);
    }
}

class AddCoinEvent extends FateEventObject {
    public eventFlow(): void {
        super.eventFlow();
    }

    protected begin(): void {
        console.log(`start add coin`);
    }
}

const eventObj = new AddCoinEvent();
eventObj.eventFlow();
