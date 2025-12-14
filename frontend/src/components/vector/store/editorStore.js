/** @format */

import { create } from "zustand"

export const useEditorStore = create((set) => ({
    document: {
        canvas: {
            width: 800,
            height: 600,
            unit: "px",
        },
        layers: [
            {
                id: "layer-1",
                name: "Layer 1",
                visible: true,
                locked: false,
            },
        ],
        objects: [],
        selectedObjectId: null,
    },

    activeTool: "select", // select | rect | text ...

    setActiveTool: (tool) =>
        set(() => ({
            activeTool: tool,
        })),

    addObject: (object) =>
        set((state) => ({
            document: {
                ...state.document,
                objects: [...state.document.objects, object],
                selectedObjectId: object.id,
            },
        })),

    selectObject: (id) =>
        set((state) => ({
            document: {
                ...state.document,
                selectedObjectId: id,
            },
        })),

    updateObject: (id, fn) =>
        set((state) => ({
            document: {
                ...state.document,
                objects: state.document.objects.map((obj) => (obj.id === id ? fn(obj) : obj)),
            },
        })),
}))
