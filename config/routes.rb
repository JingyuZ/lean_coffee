Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'random#index'

  resources :boards, only: [:index, :show]
  resources :subtopics, only: [] do
    member do
      post :vote
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, only: [:sessions, :omniauth_callbacks]
end
