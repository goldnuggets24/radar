class UsersController < ApplicationController
  before_filter :search_and_filter_users
  before_action :authenticate_user!

  def index
    render json: {
      users: @users.as_json(include: :events),
      events: Event.order("created_at DESC").all.as_json(include: :users),
      meta: {
        current_page: @users.current_page,
        next_page: @users.next_page,
        prev_page: @users.prev_page,
        total_pages: @users.total_pages,
        total_count: @users.total_count
      }
    }
  end

  def show
    @user = User.where(:name => params[:name]).first
    render @user
  end

  def update
    @user = User.find(params[:id])
    authorize @user
    if @user.update_attributes(secure_params)
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user."
    end
  end

  def destroy
    user = User.find(params[:id])
    authorize user
    user.destroy
    redirect_to users_path, :notice => "User deleted."
  end

  private

  def search_and_filter_users
    sex = [['Male'], ['Female']]
    ethnicity = [['White'], ['Black']]
    @users = if params[:search].present?
      User.search(params[:search])
    elsif params[:attr].present?
      if sex.include?(params[:attr])
        User.where(:sex => params[:attr]).includes(:events)
      elsif ethnicity.include?(params[:attr])
        User.where(:ethnicity => params[:attr]).includes(:events)
      end
    else
      User.page(params[:page]).per(params[:per]).includes(:events)
    end.sorted
  end


  def secure_params
    params.require(:user).permit(:role)
  end

end