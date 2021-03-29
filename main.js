import p5 from 'p5';

const sketch = p => {
    p.setup = () => {
        console.log("test");
    }
};

new p5(sketch);