import create from 'zustand';

export const useStore = create(
    (set) => ({

        //  Cart
        cart: {
            pizzas: []
        },

        //  Add Pizza in Cart
        addPizza: (data) =>
            set((state) => ({
                cart: {
                    pizzas: [...state.cart.pizzas, data]
                }
            })),

        //   Remove Pizza from the Cart
        removePizza: (index) =>
            set((state) => ({
                cart: {
                    pizzas: state.cart.pizzas.filter((_, i) => i != index)
                }
            })
            ),

        //    Reset Cart
        resetCart: () =>
            set((state) => ({
                cart: {
                    pizzas: []
                }
            })
            )   
    })
)
