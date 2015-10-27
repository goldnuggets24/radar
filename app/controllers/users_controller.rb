class UsersController < ApplicationController
  before_filter :search_and_filter_users
  before_action :authenticate_user!

  def index
    render json: {
      users: @users
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
    @users = if params[:search].present?
      User.search(params[:search])
    elsif params[:attr].present?
      User.where(:sex => params[:attr])
    else
      User.all
    end.sorted
  end


  def secure_params
    params.require(:user).permit(:role)
  end

end