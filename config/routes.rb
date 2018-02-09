Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'boards#index'

  resources :boards, only: [:index, :show, :create, :update, :destroy]
  resources :subtopics, only: [:create] do
    member do
      post :vote
      post :change_group
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, only: [:sessions, :omniauth_callbacks]
end
