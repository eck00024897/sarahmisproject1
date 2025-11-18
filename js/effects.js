// Create floating shapes
function createShapes() {
    const containers = document.querySelectorAll('.floating-shapes');
    containers.forEach(shapes => {
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            shape.style.width = Math.random() * 200 + 50 + 'px';
            shape.style.height = shape.style.width;
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 5 + 's';
            shapes.appendChild(shape);
        }
    });
}

// Cursor trail effect
let trails = [];
const maxTrails = 20;

function createTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    trails.push({
        element: trail,
        x: e.pageX,
        y: e.pageY,
        alpha: 1
    });

    if (trails.length > maxTrails) {
        const removed = trails.shift();
        removed.element.remove();
    }
}

function updateTrails() {
    trails.forEach((trail, index) => {
        trail.alpha *= 0.92;
        trail.element.style.opacity = trail.alpha;
        
        if (trail.alpha < 0.01) {
            trail.element.remove();
            trails.splice(index, 1);
        }
    });
    requestAnimationFrame(updateTrails);
}

// Initialize effects
document.addEventListener('DOMContentLoaded', function() {
    createShapes();
    document.addEventListener('mousemove', createTrail);
    updateTrails();
});