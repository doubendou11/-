<template>
    <div class="command-form">
      <h2>Submit Command</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="acId">Air Conditioner ID:</label>
          <input type="text" id="acId" v-model="acId" required>
        </div>
        <div>
          <label for="command">Command:</label>
          <select id="command" v-model="command" required>
            <option value="TurnOn">Turn On</option>
            <option value="TurnOff">Turn Off</option>
            <option value="SetTemperature">Set Temperature</option>
            <option value="SetMode">Set Mode</option>
            <option value="SetFanSpeed">Set Fan Speed</option>
          </select>
        </div>
        <div>
          <label for="value">setting Value:</label>
          <input type="text" id="value" v-model="value">
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        acId: '',
        command: 'TurnOn',
        value: ''
      };
    },
    methods: {
      handleSubmit() {
        const commandData = {
          AC_ID: this.acId,
          Command: this.command,
          Value: this.value
        };
        this.$emit('submitCommand', commandData);
        // Clear form fields after submission
        this.acId = '';
        this.value = '';
      }
    }
  };
  </script> 
  
  <style scoped>
  .command-form {
    padding: 20px;
  }
  
  .command-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .command-form input,
  .command-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .command-form button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .command-form button:hover {
    background-color: #0056b3;
  }
  </style>
  