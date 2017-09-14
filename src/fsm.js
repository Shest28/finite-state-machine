class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = Object.create(config);
      this.state = {
        Current: this.config.initial,
        Prev: null,
        Next: null,
      }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state.Current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (["normal", "busy", "hungry", "sleeping"].indexOf(state) != -1) {
        this.state.Prev = this.state.Current;
        this.state.Current = state;
      }
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (["study", "get_tired", "get_hungry", "eat", "get_up"].indexOf(event) != -1) {
        switch (event) {
          case "study": {
              if (this.getState() == "normal") this.changeState("busy");
              else throw new Error();
          }
          break;
          case "get_tired": {
              if (this.getState() == "busy") this.changeState("sleeping")
              else throw new Error();
          }
          break;
          case "get_hungry": {
            if ((this.getState() == "sleeping") || (this.getState() == "busy")) this.changeState("hungry")
            else throw new Error();
          }
          break;
          case "eat": {
            if (this.getState() == "hungry") this.changeState("normal");
            else throw new Error();
          }
          break;
          case "get_up": {
            if (this.getState() == "sleeping") this.changeState("normal");
            else throw new Error();
          }
          break;
          default: break;
        }
      }
      else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = {
        Current: this.config.initial,
        Prev: null,
        Next: null,
      }
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (arguments.length > 0) {
        switch (event) {
          case "get_tired": return ["busy"]; break;
          case "get_hungry": return ["busy", "sleeping"]; break;
          case "get_up": return ["sleeping"]; break;
          case "eat": return ["hungry"]; break;
          case "study": return ["normal"]; break;
          default: return []; break;
        }
      } else {
        return ["normal", "busy", "hungry", "sleeping"];
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.state.Prev) {
        this.state.Next = this.state.Current;
        this.state.Current = this.state.Prev;
        this.state.Prev = null;
        return true}
      else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.state.Next) {
        this.state.Prev = this.state.Current;
        this.state.Current = this.state.Next;
         this.state.Next = null;
        return true}
      else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.state.Prev = null;
      this.state.Next = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
