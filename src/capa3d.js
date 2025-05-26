document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.capa3d-container');

    containers.forEach(container => {
        const imagePath = container.getAttribute('data-img');
        const width = container.clientWidth || 200;
        const height = container.clientHeight || 200;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xff12c4, 1);
        scene.add(ambientLight);

        const loader = new THREE.TextureLoader();
        loader.load(imagePath, (texture) => {
            const depth = 0.035; // profundidade 

            const geometry = new THREE.BoxGeometry(1, 1, depth);
            const materials = [
                new THREE.MeshBasicMaterial({ color: 0x242222 }),   // esquerda
                new THREE.MeshBasicMaterial({ color: 0x242222 }),   // direita
                new THREE.MeshBasicMaterial({ color: 0x242222 }),   // topo
                new THREE.MeshBasicMaterial({ color: 0x242222 }),   // baixo
                new THREE.MeshBasicMaterial({ map: texture }),      // frente
                new THREE.MeshBasicMaterial({ map: texture })       // fundo
            ];

            const cube = new THREE.Mesh(geometry, materials);
            scene.add(cube);

            camera.position.z = 2.45;

            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.y += 0.02; // rotação
                renderer.render(scene, camera);
            }

            animate();
        });
    });
});

// Função para renderizar imagem 3D simples em um container específico
function render3dImage(containerId, imagePath, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container com ID '${containerId}' não encontrado`);
        return;
    }

    // Limpa o container se já tiver conteúdo
    container.innerHTML = '';

    const width = options.width || container.clientWidth || 200;
    const height = options.height || container.clientHeight || 200;
    const rotationSpeed = options.rotationSpeed || 0.02;
    const depth = options.depth || 0.035;
    const ambientColor = options.ambientColor || 0xff12c4;
    const sideColor = options.sideColor || 0x242222;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(ambientColor, 1);
    scene.add(ambientLight);

    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (texture) => {
        const geometry = new THREE.BoxGeometry(1, 1, depth);
        const materials = [
            new THREE.MeshBasicMaterial({ color: sideColor }),   // esquerda
            new THREE.MeshBasicMaterial({ color: sideColor }),   // direita
            new THREE.MeshBasicMaterial({ color: sideColor }),   // topo
            new THREE.MeshBasicMaterial({ color: sideColor }),   // baixo
            new THREE.MeshBasicMaterial({ map: texture }),       // frente
            new THREE.MeshBasicMaterial({ map: texture })        // fundo
        ];

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        camera.position.z = 2.45;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.y += rotationSpeed;
            renderer.render(scene, camera);
        }

        animate();
    }, undefined, (error) => {
        console.error('Erro ao carregar a textura:', error);
    });
}

// Função para criar um elemento 3D que baixa um arquivo quando clicado
function render3dImageFile(containerId, imagePath, filePath, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container com ID '${containerId}' não encontrado`);
        return;
    }

    // Limpa o container se já tiver conteúdo
    container.innerHTML = '';

    const width = options.width || container.clientWidth || 200;
    const height = options.height || container.clientHeight || 200;
    const rotationSpeed = options.rotationSpeed || 0.02;
    const depth = options.depth || 0.035;
    const ambientColor = options.ambientColor || 0xff12c4;
    const sideColor = options.sideColor || 0x242222;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Adiciona cursor pointer para indicar que é clicável
    renderer.domElement.style.cursor = 'pointer';

    const ambientLight = new THREE.AmbientLight(ambientColor, 1);
    scene.add(ambientLight);

    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (texture) => {
        const geometry = new THREE.BoxGeometry(1, 1, depth);
        const materials = [
            new THREE.MeshBasicMaterial({ color: sideColor }),   // esquerda
            new THREE.MeshBasicMaterial({ color: sideColor }),   // direita
            new THREE.MeshBasicMaterial({ color: sideColor }),   // topo
            new THREE.MeshBasicMaterial({ color: sideColor }),   // baixo
            new THREE.MeshBasicMaterial({ map: texture }),       // frente
            new THREE.MeshBasicMaterial({ map: texture })        // fundo
        ];

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        camera.position.z = 2.45;

        // Adiciona evento de clique para download
        renderer.domElement.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop() || 'arquivo';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.y += rotationSpeed;
            renderer.render(scene, camera);
        }

        animate();
    }, undefined, (error) => {
        console.error('Erro ao carregar a textura:', error);
    });
}

// Função para criar um elemento 3D que abre uma URL quando clicado
function render3dImageURL(containerId, imagePath, targetURL, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container com ID '${containerId}' não encontrado`);
        return;
    }

    // Limpa o container se já tiver conteúdo
    container.innerHTML = '';

    const width = options.width || container.clientWidth || 200;
    const height = options.height || container.clientHeight || 200;
    const rotationSpeed = options.rotationSpeed || 0.02;
    const depth = options.depth || 0.035;
    const ambientColor = options.ambientColor || 0xff12c4;
    const sideColor = options.sideColor || 0x242222;
    const openInNewTab = options.openInNewTab !== false; // Por padrão abre em nova aba

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Adiciona cursor pointer para indicar que é clicável
    renderer.domElement.style.cursor = 'pointer';

    const ambientLight = new THREE.AmbientLight(ambientColor, 1);
    scene.add(ambientLight);

    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (texture) => {
        const geometry = new THREE.BoxGeometry(1, 1, depth);
        const materials = [
            new THREE.MeshBasicMaterial({ color: sideColor }),   // esquerda
            new THREE.MeshBasicMaterial({ color: sideColor }),   // direita
            new THREE.MeshBasicMaterial({ color: sideColor }),   // topo
            new THREE.MeshBasicMaterial({ color: sideColor }),   // baixo
            new THREE.MeshBasicMaterial({ map: texture }),       // frente
            new THREE.MeshBasicMaterial({ map: texture })        // fundo
        ];

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        camera.position.z = 2.45;

        // Adiciona evento de clique para abrir URL
        renderer.domElement.addEventListener('click', () => {
            if (openInNewTab) {
                window.open(targetURL, '_blank');
            } else {
                window.location.href = targetURL;
            }
        });

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.y += rotationSpeed;
            renderer.render(scene, camera);
        }

        animate();
    }, undefined, (error) => {
        console.error('Erro ao carregar a textura:', error);
    });
}