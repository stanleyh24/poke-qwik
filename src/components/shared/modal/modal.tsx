import { type PropFunction, Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
    showModal: boolean;
    persistente?: boolean;
    size: 'sm'|'md'|'lg';
    closeFn : PropFunction<() => void>;
}

export const Modal = component$( ({showModal, closeFn, persistente=false, size='md' }:Props) => {

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div 
            id="modal-content" 
            onClick$={(event) => {
                const elementID = (event.target as HTMLDivElement).id
                if (elementID === "modal-content" && !persistente) {
                    closeFn()
                }
            }} 
            class={ showModal ? "modal-background": "hidden"}
        >
            <div class={["modal-content", `modal-${size}`]}>
                
                <div class="mt-3 text-center">
                    
                    <h3 class="modal-title">
                        <Slot name='title' />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content'/>
                        </div>
                    </div>


                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button"
                            onClick$={closeFn}
                        >
                            Cerrar
                        </button>
                    </div>

                    <Slot/>
                    
                    
                </div>
            </div>
        </div>
    )
});