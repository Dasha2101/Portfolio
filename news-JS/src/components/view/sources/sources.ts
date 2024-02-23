import './sources.css';
import { Source } from '../../../types/index.js'
class Sources {
    public draw(data: Source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item: Source) => {
                const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
                const sourceText: Element | null = sourceClone.querySelector('.source__item-name')
                if (sourceText) {
                    sourceText.textContent = item.name;
                }
                const sourceId: Element | null = sourceClone.querySelector('.source__item');
                if (sourceId) {
                    sourceId.setAttribute('data-source-id', item.id);
                }
                fragment.append(sourceClone);
            });

            const doxs: Element | null = document.querySelector('.sources');
            if (doxs) {
                doxs.append(fragment);
            }
        }
    }
}

export default Sources;
