function canvasApp() {
    let canvas,
      context,
      x1,
      y1,
      x2,
      y2,
      isDown = false,
      windowHeight,
      windowWidth,
      colorBtns;

    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    canvas = document.getElementById('canvas');
    canvas.style.position = 'absolute';
    canvas.height = windowHeight;
    canvas.width = windowWidth;
    canvasPosition = canvas.getBoundingClientRect()

    context = canvas.getContext('2d');
    context.lineWidth = 2;

    window.addEventListener('resize', resizeCanvas, false);


    function resizeCanvas() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        context.lineWidth = 2;
    }

    canvas.onmousedown = function (e) {
        e = e || window.event;

        GetStartPoints(e);
    };

    canvas.onmouseup = function (e) {
        e = e || window.event;

        GetEndPoints(e);

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };

    function GetStartPoints(e) {
          // This function sets start points

          x1 = e.pageX - canvasPosition.left;
          y1 = e.pageY - canvasPosition.top;
    }

    function GetEndPoints(e) {
        // This function sets end points

          x2 = e.pageX - canvasPosition.left;
          y2 = e.pageY - canvasPosition.top;
    }

    colorBtns = ['black', 'red', 'green', 'blue', 'yellow', 'transparent'];

    const colorBtnHandler = colorBtns => {
        colorBtns.forEach(color => {
            let currentBtn = document.getElementById(color);
            currentBtn.addEventListener('click', () => {
                draw(color, currentBtn);
            }, false)
        });
    };

    const draw = (color, button) => {

        if (!canvasStatus.active) {
          swal('Canvas Not Active', 'To be able to draw, you must activate the canvas. Click the canvas button in the top navigation.', "warning")
        }

        if (color === 'transparent') {
          context.lineWidth = 40;
          context.globalCompositeOperation = "destination-out";
        } else {
          context.strokeStyle = color;
          context.lineWidth = 2;
          context.globalCompositeOperation = "source-over";
        }
        changeBtnFocus(button);
    };

    const changeBtnFocus = button => {
        document.querySelectorAll('.colors').forEach( btn => {
            btn.style.color = '';
        });
        button.id == 'transparent' ? button.style.color = 'white' : button.style.color = button.id
    };
    colorBtnHandler(colorBtns);
}
