# backend/api/urls.py
from django.urls import path, include
from Users.views import UserViewSet
from Company.views import CompanyViewSet
from Departments.views import DepartmentViewSet
from Employee.views import EmployeeViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),  # This includes all routes from the router
    path('api-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
