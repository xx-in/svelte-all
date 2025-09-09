<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  onMount(init);
  function init() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const fullName = document.getElementById("fullName");

    const data = new Proxy(
      {
        firstName: "",
        lastName: "",
        fullName: "",
      },
      {
        set(obj, prop, newValue) {
          obj[prop] = newValue;
          dataEvents.update(prop);
        },
      },
    );

    const dataEvents = {
      update(prop, newValue, oldValue) {
        dataEvents[prop].forEach((cb) => {
          cb();
        });
      },
      firstName: [],
      lastName: [],
      fullName: [],
    };

    /**
     * 定义监听函数
     */
    function watch(cb, propers) {
      propers.forEach((prop) => {
        dataEvents[prop].push(cb);
      });
    }

    watch(
      function (newValue) {
        firstName.value = data.firstName;
      },
      ["firstName"],
    );

    watch(
      function () {
        data.fullName = data.firstName + data.lastName;
      },
      ["firstName", "lastName"],
    );

    watch(
      function () {
        lastName.value = data.lastName;
      },
      ["lastName"],
    );

    watch(
      function () {
        fullName.innerText = data.fullName;
      },
      ["fullName"],
    );

    firstName.addEventListener("input", (e) => {
      data.firstName = e.target.value;
    });

    lastName.addEventListener("input", (e) => {
      data.lastName = e.target.value;
    });

    data.firstName = "姓";
    data.lastName = "名";

    console.log(dataEvents);
  }
</script>

<svelte:head>
  <title>发布订阅5</title>
</svelte:head>
<div>
  <div>
    <span>姓:</span>
    <input id="firstName" placeholder="请输入姓" />
  </div>
  <div>
    <span>名:</span>
    <input id="lastName" placeholder="请输入名" />
  </div>
  <div>
    <span>姓名: </span>
    <span id="fullName"></span>
  </div>
</div>
