import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProducts: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields." }
        }

        const res = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json()
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: data.message }
    },
    fetchProducts: async () => {
        const res = await fetch('/api/product')
        const data = await res.json()
        set({ products: data.data })
    },
    deleteProducts: async (productId) => {
        const res = await fetch(`/api/product/${productId}`, {
            method: 'DELETE'
        })
        const data = await res.json()

        if (!data.success) return { success: false, message: data.message }

        //Update the UI in frontend, Immediately without needing refresh
        set((state) => ({ products: state.products.filter(product => product._id !== productId) }))
        return { success: true, message: data.message }
    },
    updateProducts: async (productId, currentState) => {
        // console.log(productId, 'productjs', currentState)
        let res = await fetch(`/api/product/${productId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentState)
        })
        let data = await res.json()
        if (!data) return { success: false, message: data.message }

        set((state) => ({
            products: state.products.map((product) => (product._id === productId ? data.data : product))
        }))

        
        return { success: true, message: data.message }

    }

}))

